$(function(){

fillDropdownCapital();
fillDropdownCountry();
fillDropdownContinent();
showCountryDetails();
});

function fillDropdownCapital() {
        $.ajax({
            url: "https://restcountries.com/v3.1/all?fields=capital",
            method: "GET",
            dataType: "JSON"
        }).done(function(data) {
            var text = "";
            text += "<option value='0'>Seleccione la capital</option>";
            $.each(data, function(index, value) {
                if(value.capital)
                text += "<option value='" + value.capital + "'>" + value.capital + "</option>";
            });
            $("#searchByCapital").html(text);
        }).fail(function(msg) {
            console.table(msg);
        });
}

function fillDropdownCountry() {
    $.ajax({
        url: "https://restcountries.com/v3.1/all?fields=name",
        method: "GET",
        dataType: "JSON"
    }).done(function(data) {
        var text = "";
        text += "<option value='0'>Seleccione el país</option>";
        $.each(data, function(index, value) {
            if(value.name.common)
            text += "<option value='" + value.name.common + "'>" + value.name.common + "</option>";
        });
        $("#searchByCountry").html(text);
    }).fail(function(msg) {
        console.table(msg);
    });
}

function fillDropdownContinent() {
    $.ajax({
        url: "https://restcountries.com/v3.1/all?fields=region",
        method: "GET",
        dataType: "JSON"
    }).done(function(data) {
        var text = "";
        text += "<option value='0'>Seleccione el continente</option>";
        $.each(data, function(index, value) {
            if(!text.includes(value.region))
            text += "<option value='" + value.region + "'>" + value.region + "</option>";
        });
        $("#searchByContinent").html(text);
    }).fail(function(msg) {
        console.table(msg);
    });
}

function showCountryDetails(){

    $("#searchByCapital").on("change",function(){
        $("#searchByContinent").val("0");
        $("#searchByCountry").val("0");
        selectedCapital = $(this).val();
        showCountryDetailsList("capital",selectedCapital);
    });

    $("#searchByCountry").on("change",function(){
        $("#searchByCapital").val("0");
        $("#searchByContinent").val("0");
        selectedCountry = $(this).val();
        showCountryDetailsList("country",selectedCountry);
    });

    $("#searchByContinent").on("change",function(){
        $("#searchByCapital").val("0");
        $("#searchByCountry").val("0");
        selectedContinent = $(this).val();
        showCountryDetailsList("region",selectedContinent);
    });
}

function showCountryDetailsList(comparisonString,selectedParam){
    
    $.ajax({
        url: "https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,maps",
        method: "GET",
        dataType: "JSON"
    }).done(function(data) {
        var text = "";
        text += '<div class="row" id="labels"><div class="col-md-2">Pais</div><div class="col-md-3">Capital</div><div class="col-md-2">Continente</div><div class="col-md-2">Subcontinente</div><div class="col-md-3">Googlemaps Link</div></div>';
        $.each(data, function(index, value) {
            switch (comparisonString) {
                case "capital": comparisonParam = value.capital; break;
                case "country": comparisonParam = value.name.common; break;
                case "region" : comparisonParam = value.region; break;
                default: break;
            }
            if(value && comparisonParam.includes(selectedParam)){
            text += '<div class="row country-details">';
            text += '<div class="col-md-2">'+value.name.common+'</div>'//nombre
            text += '<div class="col-md-3">'+value.capital+'</div>'//capital
            text += '<div class="col-md-2">'+value.region+'</div>'//continente
            text += '<div class="col-md-2">'+value.subregion+'</div>'//subcontinente
            text += '<div class="col-md-3"><a href="'+value.maps.googleMaps+'">Maps</a></div>'//googlemaps
            text += '</div>'
            }
        });
    $("#details").html(text);
        }).fail(function(msg) {
            console.table(msg);
        });
}