
src="https://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"

$(document).ready(function () {

   $("#fave-list").hide();
   $("#repetido").focus();

   $("#repetido").hide();

  /*
   * check browser supports local storage
   */
  if (localStorage) {

    var faveList_string = localStorage.getItem('faveList');
    if (faveList_string) {
      $("#fave-list-text").hide();
      $("#fave-list").show();
      var faveList = JSON.parse(faveList_string);
      console.log(faveList);
      $.each(faveList, (index, text) => {
        $("#fave-list").append(`<li class="list-group-item">${text}</li>`);
      });
    }
    
    $("form")
      /*
       * clear local storage when the form is reseted
       */
      .on('reset', function(){
        console.log('cleaning!...');
        localStorage.clear();
        location.reload();
      })
      /*
       * add to local storage when the form is submitted
       */
       .submit(function(){
        var faveList_string = localStorage.getItem('faveList');
        var faveList =[];

        if(faveList_string) {
          faveList = JSON.parse(faveList_string);
        }
        faveList.push($("#repetido").val());
        localStorage.setItem('faveList', JSON.stringify(faveList));
        console.log(localStorage);
      })
  }
});