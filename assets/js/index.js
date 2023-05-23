$("#add_user").submit(function (event) {
  alert("Data Inserted Successfully!");
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_arry = $(this).serializeArray();
  var data = {};

  $.map(unindexed_arry, function (n, i) {
    data[n["name"]] = n["value"];
  });

  console.log(data);

  var request = {
    url: `http://localhost:3000/api/user/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data Updated Successfully!");
  });
});

// if (window.location.pathname == "/") {
//   $ondelete = $(".tavle tbody td a.delete");
//   $ondelete.click(function () {
//     var id = $(this).attr("data-id");

//     var request = {
//       "url": `http://localhost:3000/api/user/${id}`,
//       "method": "DELETE",
//     };

//     if (confirm("Do you really want to delete this record?")) {
//       $.ajax(request).done(function (response) {
//         alert("Data Delete Successfully!");
//         Location.relode();
//       });
//     }
//   });
// }

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/user/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}
