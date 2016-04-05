$(document).ready(function(){
  $('#button').click(sendform);
})


var sendform = function(){
  var data = {}
  $('input').each(function(){
    data[$(this).attr('name')] = $(this).val();
  });
  console.log(data);

  $.ajax({
    url:'/login',
    method:'POST',
    data:data,
    success:function(data){
      
    }
  });
}
