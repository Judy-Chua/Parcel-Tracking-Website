
//$('#elementId');
//$('.className');

$(document).ready(function() {
    const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000; //random
    var otherService = false;
    removeErrorMsg();
    setDate();
    $('.otherService').hide();

    $('#inputState').change(function() {
        updateCity();
    });

    $('#inputService').change(function() {
        if ($('#inputService').val() == "Other") {
            $('.otherService').show();
            otherService = true;
        } else {
            $('.otherService').hide();
            otherService = false;
        }
    });

    $('#submitOrder').click(function() {
        if (validateInput(otherService)) {
            window.location.href = "success.html?randomNumber=" + randomNumber;
        }
    });

});

function setDate() {
    const today = new Date();
    today.setDate(today.getDate() + 2); // Add 2 days
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    $('#inputDate').attr('min', minDate);
}

function validateInput(otherService) {
    const first = $('#inputFirst').val();
    const last = $('#inputLast').val();
    const email = $('#inputEmail').val();
    const phone = $('#inputPhone').val();
    const address = $('#inputAddress').val();
    const state = $('#inputState').val();
    const city = $('#inputCity').val();
    const date = $('#inputDate').val();
    const service = $('#inputService').val();
    const other = $('#inputOtherService').val();
    const payment = $('#inputPayment').val();
    var noError = true;
    removeErrorMsg();

    if (checkEmpty(first, "#inputFirst")) { //first name
        $('#errorFirst').html("Please input your first name.");
        noError = false;
    }

    if (checkEmpty(last, "#inputLast")) { //last name
        $('#errorLast').html("Please input your last name.");
        noError = false;
    }

    if (checkEmpty(email, "#inputEmail")) { //email address
        $('#errorEmail').html("Please input email address.");
        noError = false;
    }

    if (checkEmpty(phone, "#inputPhone")) { //phone number
        $('#errorPhone').html("Please input phone number.");
        noError = false;
    }

    if (checkEmpty(address, "#inputAddress")) { //street address
        $('#errorAddress').html("Please input address.");
        noError = false;
    }

    if (checkEmpty(state, "#inputState")) { //state/province
        $('#errorState').html("Please select one state.");
        noError = false;
    }

    if (checkEmpty(city, "#inputCity")) { //city
        $('#errorCity').html("Please select one city.");
        noError = false;
    }

    if (checkEmpty(date, "#inputDate")) { //date
        $('#errorDate').html("Please select a date.");
        noError = false;
    }

    if (checkEmpty(service, "#inputService")) { //service
        $('#errorService').html("Please select a service.");
        noError = false;
    } else if (otherService && checkEmpty(other, "#inputOtherService")) {
        $('#errorService').html("Please input your desired service in the provided text box.");
        noError = false;
    }

    if (checkEmpty(payment, "#inputPayment")) { //service
        $('#errorPayment').html("Please select a mode of payment.");
        noError = false;
    }

    return noError;
}

function removeErrorMsg() {
    $('#errorFirst').html('<br/>');
    $('#errorLast').html('<br/>');
    $('#errorEmail').html('<br/>');
    $('#errorPhone').html('<br/>');
    $('#errorAddress').html('<br/>');
    $('#errorState').html('<br/>');
    $('#errorCity').html('<br/>');
    $('#errorDate').html('<br/>');
    $('#errorService').html('<br/>');
    $('#errorPayment').html('<br/>');
}

function checkEmpty(value, id) {
    if (!value) { //check if input is empty or not 
        $(id).css('background-color', 'red');
        $(id).css('color', 'white');
        return true;
    } else { //reset in case it is originally empty
        $(id).css('background-color', 'white');
        $(id).css('color', 'black');
    }
    return false;
}

function updateCity() {
    const state = $('#inputState');
    const city = $('#inputCity');
    if (state.val() == "") {
        $('.selectCity').hide();
        return;
    }
    console.log(state.val());

    $('.selectCity').show();
    city.empty().append('<option value=""></option>');
    //clear first

    if (state.val() == "Agusan-del-Norte") {
        city.append('<option value="Butuan">Butuan</option>');
        city.append('<option value="Cabadbaran">Cabadbaran</option>');
    } else if (state.val() == "Agusan-del-Sur") {
        city.empty().append('<option value="Bayugan">Bayugan</option>');
    } else if (state.val() == "Albay") {
        city.append('<option value="Legazpi">Legazpi</option>');
        city.append('<option value="Ligao">Ligao</option>');
        city.append('<option value="Tabaco">Tabaco</option>');
    } else if (state.val() == "Basilan") {
        city.append('<option value="Isabela">Isabela</option>');
        city.append('<option value="Lamitan">Lamitan</option>');
    } else if (state.val() == "Bataan") {
        city.empty().append('<option value="Balanga">Balanga</option>');
    } else if (state.val() == "Batangas") {
        city.append('<option value="Batangas-City">Batangas City</option>');
        city.append('<option value="Lipa">Lipa</option>');
        city.append('<option value="Tanauan">Tanauan</option>');
    } else if (state.val() == "Benguet") {
        city.empty().append('<option value="Baguio">Baguio</option>');
    } else if (state.val() == "Bohol") {
        city.empty().append('<option value="Tagbilaran">Tagbilaran</option>');
    } else if (state.val() == "Bukidnon") {
        city.append('<option value="Malaybalay">Malaybalay</option>');
        city.append('<option value="Valencia">Valencia</option>');
    } else if (state.val() == "Bulacan") {
        city.append('<option value="Malolos">Malolos</option>');
        city.append('<option value="Meycauayan">Meycauayan</option>');
        city.append('<option value="San-Jose-del-Monte">San Jose del Monte</option>');
    } else if (state.val() == "Cagayan") {
        city.empty().append('<option value="Tuguegarao">Tuguegarao</option>');
    } else if (state.val() == "Camarines-Sur") {
        city.append('<option value="Iriga">Iriga</option>');
        city.append('<option value="Naga">Naga</option>');
    } else if (state.val() == "Cavite") {
        city.append('<option value="Bacoor">Bacoor</option>');
        city.append('<option value="Cavite-City">Cavite City</option>');
        city.append('<option value="Dasmarinas">Dasmarinas</option>');
        city.append('<option value="General-Trias">General Trias</option>');
        city.append('<option value="Imus">Imus</option>');
        city.append('<option value="Tagaytay">Tagaytay</option>');
        city.append('<option value="Trece-Martires">Trece Martires</option>');
    } else if (state.val() == "Cebu") {
        city.append('<option value="Bogo">Bogo</option>');
        city.append('<option value="Carcar">Carcar</option>');
        city.append('<option value="Cebu-City">Cebu City</option>');
        city.append('<option value="Danao">Danao</option>');
        city.append('<option value="Lapu-Lapu">Lapu-Lapu</option>');
        city.append('<option value="Mandaue">Mandaue</option>');
        city.append('<option value="Naga">Naga</option>');
        city.append('<option value="Talisay">Talisay</option>');
        city.append('<option value="Toledo">Toledo</option>');
    } else if (state.val() == "Cotabato") {
        city.empty().append('<option value="Kidapawan">Kidapawan</option>');
    } else if (state.val() == "Davao-del-Norte") {
        city.append('<option value="Panabo">Panabo</option>');
        city.append('<option value="Samal">Samal</option>');
        city.append('<option value="Tagum">Tagum</option>');
    } else if (state.val() == "Davao-del-Sur") {
        city.append('<option value="Davao-City">Davao City</option>');
        city.append('<option value="Digos">Digos</option>');
    } else if (state.val() == "Davao-Oriental") {
        city.empty().append('<option value="Mati">Mati</option>');
    } else if (state.val() == "Eastern-Samar") {
        city.empty().append('<option value="Borongan">Borongan</option>');
    } else if (state.val() == "Ilocos-Norte") {
        city.append('<option value="Batac">Batac</option>');
        city.append('<option value="Laoag">Laoag</option>');
    } else if (state.val() == "Ilocos-Sur") {
        city.append('<option value="Candon">Candon</option>');
        city.append('<option value="Vigan">Vigan</option>');
    } else if (state.val() == "Iloilo") {
        city.append('<option value="Iloilo-City">Iloilo City</option>');
        city.append('<option value="Passi">Passi</option>');
    } else if (state.val() == "Isabela") {
        city.append('<option value="Cauayan">Cauayan</option>');
        city.append('<option value="Ilagan">Ilagan</option>');
        city.append('<option value="Santiago">Santiago</option>');
    } else if (state.val() == "Kalinga") {
        city.empty().append('<option value="Tabuk">Tabuk</option>');
    } else if (state.val() == "Laguna") {
        city.append('<option value="Binan">Binan</option>');
        city.append('<option value="Cabuyao">Cabuyao</option>');
        city.append('<option value="Calamba">Calamba</option>');
        city.append('<option value="San-Pablo">San Pablo</option>');
        city.append('<option value="San-Pedro">San Pedro</option>');
        city.append('<option value="Santa-Rosa">Santa Rosa</option>');
    } else if (state.val() == "Lanao-del-Norte") {
        city.empty().append('<option value="Iligan">Iligan</option>');
    } else if (state.val() == "Lanao-del-Sur") {
        city.empty().append('<option value="Marawi">Marawi</option>');
    } else if (state.val() == "Leyte") {
        city.append('<option value="Baybay">Baybay</option>');
        city.append('<option value="Ormoc">Ormoc</option>');
        city.append('<option value="Tacloban">Tacloban</option>');
    } else if (state.val() == "Maguindanao-del-Norte") {
        city.empty().append('<option value="Cotabato-City">Cotabato City</option>');
    } else if (state.val() == "Metro-Manila") {
        city.append('<option value="Caloocan">Caloocan</option>');
        city.append('<option value="Las-Pinas">Las Pinas</option>');
        city.append('<option value="Makati">Makati</option>');
        city.append('<option value="Malabon">Malabon</option>');
        city.append('<option value="Mandaluyong">Mandaluyong</option>');
        city.append('<option value="Manila">Manila</option>');
        city.append('<option value="Marikina">Marikina</option>');
        city.append('<option value="Muntinlupa">Muntinlupa</option>');
        city.append('<option value="Navotas">Navotas</option>');
        city.append('<option value="Paranaque">Paranaque</option>');
        city.append('<option value="Pasay">Pasay</option>');
        city.append('<option value="Pasig">Pasig</option>');
        city.append('<option value="Quezon-City">Quezon City</option>');
        city.append('<option value="San-Juan">San Juan</option>');
        city.append('<option value="Taguig">Taguig</option>');
        city.append('<option value="Valenzuela">Valenzuela</option>');
    } else if (state.val() == "Misamis-Occidental") {
        city.append('<option value="Oroquieta">Oroquieta</option>');
        city.append('<option value="Ozamiz">Ozamiz</option>');
        city.append('<option value="Tangub">Tangub</option>');
    } else if (state.val() == "Misamis-Oriental") {
        city.append('<option value="Cagayan-de-Oro">Cagayan de Oro</option>');
        city.append('<option value="El-Salvador">El Salvador</option>');
        city.append('<option value="Gingoog">Gingoog</option>');
    } else if (state.val() == "Negros-Occidental") {
        city.append('<option value="Bacolod">Bacolod</option>');
        city.append('<option value="Bago">Bago</option>');
        city.append('<option value="Cadiz">Cadiz</option>');
        city.append('<option value="Escalante">Escalante</option>');
        city.append('<option value="Himamaylan">Himamaylan</option>');
        city.append('<option value="Kabankalan">Kabankalan</option>');
        city.append('<option value="La-Carlota">La Carlota</option>');
        city.append('<option value="Sagay">Sagay</option>');
        city.append('<option value="San-Carlos">San Carlos</option>');
        city.append('<option value="Silay">Silay</option>');
        city.append('<option value="Sipalay">Sipalay</option>');
        city.append('<option value="Talisay">Talisay</option>');
        city.append('<option value="Victorias">Victorias</option>');
    } else if (state.val() == "Negros-Oriental") {
        city.append('<option value="Bais">Bais</option>');
        city.append('<option value="Bayawan">Bayawan</option>');
        city.append('<option value="Canlaon">Canlaon</option>');
        city.append('<option value="Dumaguete">Dumaguete</option>');
        city.append('<option value="Guihulngan">Guihulngan</option>');
        city.append('<option value="Tanjay">Tanjay</option>');
    } else if (state.val() == "Northern-Samar") {
        city.empty().append('<option value="Catarman">Catarman</option>');
    } else if (state.val() == "Nueva-Ecija") {
        city.append('<option value="Cabanatuan">Cabanatuan</option>');
        city.append('<option value="Gapan">Gapan</option>');
        city.append('<option value="Munoz">Munoz</option>');
        city.append('<option value="San-Jose">San Jose</option>');
        city.append('<option value="Palayan">Palayan</option>');
    } else if (state.val() == "Nueva-Vizcaya") {
        city.append('<option value="Bayombong">Bayombong</option>');
        city.append('<option value="Solano">Solano</option>');
    } else if (state.val() == "Palawan") {
        city.empty().append('<option value="Puerto-Princesa">Puerto Princesa</option>');
    } else if (state.val() == "Pampanga") {
        city.append('<option value="Angeles">Angeles</option>');
        city.append('<option value="Mabalacat">Mabalacat</option>');
        city.append('<option value="San-Fernando">San Fernando</option>');
    } else if (state.val() == "Pangasinan") {
        city.append('<option value="Alaminos">Alaminos</option>');
        city.append('<option value="Dagupan">Dagupan</option>');
        city.append('<option value="San-Carlos">San Carlos</option>');
        city.append('<option value="Urdaneta">Urdaneta</option>');
    } else if (state.val() == "Quezon") {
        city.append('<option value="Lucena">Lucena</option>');
        city.append('<option value="Tayabas">Tayabas</option>');
    } else if (state.val() == "Rizal") {
        city.empty().append('<option value="Antipolo">Antipolo</option>');
    } else if (state.val() == "Samar") {
        city.append('<option value="Calbayog">Calbayog</option>');
        city.append('<option value="Catbalogan">Catbalogan</option>');
    } else if (state.val() == "Sarangani") {
        city.empty().append('<option value="Alabel">Alabel</option>');
    } else if (state.val() == "South-Cotabato") {
        city.append('<option value="Koronadal">Koronadal</option>');
        city.append('<option value="General-Santos">General Santos</option>');
    } else if (state.val() == "Sultan-Kudarat") {
        city.empty().append('<option value="Tacurong">Tacurong</option>');
    } else if (state.val() == "Sulu") {
        city.empty().append('<option value="Jolo">Jolo</option>');
    } else if (state.val() == "Surigao-del-Norte") {
        city.empty().append('<option value="Surigao">Surigao</option>');
    } else if (state.val() == "Surigao-del-Sur") {
        city.append('<option value="Bislig">Bislig</option>');
        city.append('<option value="Tandag">Tandag</option>');
    } else if (state.val() == "Tarlac") {
        city.empty().append('<option value="Tarlac">Tarlac</option>');
    } else if (state.val() == "Zambales") {
        city.empty().append('<option value="Olongapo">Olongapo</option>');
    } else if (state.val() == "Zamboanga-del-Norte") {
        city.append('<option value="Dipolog">Dipolog</option>');
        city.append('<option value="Dapitan">Dapitan</option>');
    } else if (state.val() == "Zamboanga-del-Sur") {
        city.append('<option value="Pagadian">Pagadian</option>');
        city.append('<option value="Zamboanga-City">Zamboanga City</option>');
    } else if (state.val() == "Zamboanga-Sibugay") {
        city.empty().append('<option value="Ipil">Ipil</option>');
    } else {
        $('.selectCity').hide();
        city.empty().append('<option value="No-City">No City</option>');
    }
    
}