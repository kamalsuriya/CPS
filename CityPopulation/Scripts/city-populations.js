/// <reference path="jquery-1.10.2.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    SearchCity(10);
}

//Function for getting the Data Based upon ID
function getbyID(item_id) {
    $('#city').css('border-color', 'lightgrey');
    $('#state').css('border-color', 'lightgrey');
    $('#_id').css('border-color', 'lightgrey');
    $('#pop').css('border-color', 'lightgrey');
    $.ajax({
        url: "/api/Populations/GetPopulation/" + item_id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#city').val(result.city);
            $('#state').val(result.state);
            $('#_id').val(result._id);
            $('#pop').val(result.pop);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var cpObj = {
        city: $('#city').val(),
        state: $('#state').val(),
        _id: $('#_id').val(),
        pop: $('#pop').val(),
    };
    $.ajax({
        url: "/api/Populations",
        data: JSON.stringify(cpObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#city').modal('hide');
            $('#state').val("");
            $('#_id').val("");
            $('#pop').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating record
function SearchCity(count) {
    var city = $('#searchCity').val();
    $.ajax({
        url: "/api/Populations/SearchCity?&count="+count+"&filter=" + city,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.city + '</td>';
                html += '<td>' + item.state + '</td>';
                html += '<td>' + item._id + '</td>';
                html += '<td>' + item.pop + '</td>';
                html += '<td><a href="#" onclick="return getbyID(&quot;' + item._id + '&quot;)">Edit</a></td>';
                html += '</tr>';

            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Function for clearing the textboxes
function clearTextBox() {
    $('#city').val("");
    $('#state').val("");
    $('#_id').val("");
    $('#pop').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#city').css('border-color', 'lightgrey');
    $('#state').css('border-color', 'lightgrey');
    $('#_id').css('border-color', 'lightgrey');
    $('#pop').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#city').val().trim() == "") {
        $('#city').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#city').css('border-color', 'lightgrey');
    }
    if ($('#state').val().trim() == "") {
        $('#state').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#state').css('border-color', 'lightgrey');
    }
    if ($('#pop').val().trim() == "") {
        $('#pop').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#pop').css('border-color', 'lightgrey');
    }
    return isValid;
}