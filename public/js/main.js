$(document).ready(function(){
    $('.app__list-remove').on('click', function(e){
        $target = $(e.target);
        let id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/task/'+ id,
            success: function(res){
                window.location.href = '/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });


    $(".container").click(function(e) {
        $target = $(e.target);
        if($target.is(".edit-icon")) {
            let taskText = $target.prev($(".app__list-text")).html();
            let id = $target.parent(".app__list-item").attr("data-id");
            let form = `
                <div class= "edit">
                  <span class="edit-text">${taskText}</span>
                  <input type="text" name="edit" placeholder="Edit task" class="edit__input"/>
                  <button class="edit-btn">Изменить</button>
                </div>
            `;

            $target.css("display", "none");

            $(".container").append(form);

            $(".edit-btn").on('click', function() {
                let value = $(this).prev($(".edit__input")).val();
                if(value == ""){
                    value = taskText;
                }
                $.ajax({
                    type: 'POST',
                    url: '/edit/'+ id,
                    data: {
                        value: value.slice(0,1).toUpperCase() + value.slice(1).toLowerCase(),
                    },
                    success: function(res){
                        window.location.href = '/';
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            });


        }

        else if($target.is(".app__list-text")){
            let id = $target.attr('data-id');
            $.ajax({
                type: 'POST',
                url: '/complete/'+ id,
                success: function(res){
                    window.location.href = '/';
                },
                error: function(err){
                    console.log(err);
                }
            });
        }


    });




})
