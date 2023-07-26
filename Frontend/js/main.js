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
            var capitals = new Array();
            text += "<option value='0'>Seleccione la capital</option>";
            $.each(data, function(index, value) {
                if (value.capital && value.capital.length > 0) capitals.push(value.capital);
            });
            capitals.sort();
            for(let i = 0; i < capitals.length;i++){
                    text += "<option value='" + capitals[i] + "'>" + capitals[i] + "</option>";
            }
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
        var countries = new Array();
        text += "<option value='0'>Seleccione el país</option>";
        $.each(data, function(index, value) {
            if(value.name.common) countries.push(value.name.common);
        });
        countries.sort();
            for(let i = 0; i < countries.length;i++){
                    text += "<option value='" + countries[i] + "'>" + countries[i] + "</option>";
            }
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
        var continents = new Array();
        text += "<option value='0'>Seleccione el continente</option>";
        $.each(data, function(index, value) {
            if(!continents.includes(value.region)) continents.push(value.region);
        });
        continents.sort();
        for(let i = 0; i < continents.length;i++){
                text += "<option value='" + continents[i] + "'>" + continents[i] + "</option>";
        }
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
        var text = "<h2>Resultados:</h2>";
        text += '<div class="row" id="labels"><div class="col-md-2">Pais</div><div class="col-md-3">Capital</div><div class="col-md-2">Continente</div><div class="col-md-2">Subcontinente</div><div class="col-md-3">Googlemaps Link</div></div>';
        $.each(data, function(index, value) {
            switch (comparisonString) {
                case "capital": comparisonParam = value.capital; break;
                case "country": comparisonParam = value.name.common; break;
                case "region" : comparisonParam = value.region; break;
                default: break;
            }
            if(value && comparisonParam.includes(selectedParam)){
            text += '<h4>Detalle de '+value.name.common+'</h4>';
            text += '<div class="row country-details">';
            text += '<div class="col-md-2">'+value.name.common+'</div>'//nombre
            text += '<div class="col-md-3">'+value.capital+'</div>'//capital
            text += '<div class="col-md-2">'+value.region+'</div>'//continente
            text += '<div class="col-md-2">'+value.subregion+'</div>'//subcontinente
            text += '<div class="col-md-3 map"><a href="'+value.maps.googleMaps+'">Maps</a></div>'//googlemaps
            text += '</div>'
            }
        });
    $("#details").html(text);
        }).fail(function(msg) {
            console.table(msg);
        });
}