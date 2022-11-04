{
    //method to submit post data using Ajax
    console.log('working')
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        console.log(newPostForm);
        newPostForm.submit((e) => {
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:(data) => {
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost);
                    $('#new-post-form')[0][0].value='';
                    deletePost($(' .delete-post-button',newPost));
                    callNotification(data.success,null);
                },
                error:(error) => {
                    console.log(error.responseText);
                    callNotification(null,error.responseText);
                }
            });
        });
    }

    //method to create post in DOM

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}"> 
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
    
        <div class="post-comments">
            <form action="/comment/create" id="new-comment-form" method="POST">
                <textarea name="content" id="" cols="30" rows="2" placeholder="Type here...." required></textarea>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
    
            <div class="post-comment-list">
                <ul id="post-comments-${post._id}">
    
    
                </ul>
            </div>
        </div>
        
    </li>
    `)
    }


    //delete post from DOM

    let deletePost = function(deleteLink){
        console.log('delete post1')
        $(deleteLink).click((e) => {
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).attr('href'),
                success:(data) => {
                    console.log(data,'delete post');
                    $(`#post-${data.data.post_id}`).remove();
                    callNotification(data.success,null);
                },
                error:(error) => {
                    console.log(error.responseText)
                    callNotification(null,error.responseText);
                }
            })
        })
    }

    let addDeletePost = function(){
        let deleteLinks = $('.delete-post-button');
        console.log(deleteLinks);
        for(deleteLink of deleteLinks){
            deletePost(deleteLink);
        }
    }

    let callNotification = function(success,error) {
        if(success && success.length > 0) { 
            new Noty({
                theme:'relax',
                text: success,
                type:'success',
                layout:'topRight',
                timeout:1500
            }).show();
        }
        
        if(error && error.length > 0) { 
            new Noty({
                theme:'relax',
                text: error,
                type:'error',
                layout:'topRight',
                timeout:1500
            }).show();
        }
    }

    addDeletePost();
    createPost();
}

