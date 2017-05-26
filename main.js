
$(document).ready(function () {

    //focus on text field
    $("#searchField").focus();

    //search button is clicked
    $("#searchSubmit").click(function () {

        wikiView.searchQuery();
    });

    //enter is pressed with text field focused
    $(document).on("keypress", "#searchField", function (e) {
        if (e.which === 13) {
            wikiView.searchQuery();
        }
    });

});

const wikiView = {
    searchQuery: function() {
        $(".message").html("");
        const str = $("#searchField").val();
        if (str !== "") {
            const linkString = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + str;
            $.getJSON(linkString, function (json) {
                $.each(json.query.pages, function () {
                    let htmlString = "";
                    htmlString += "<a href='https://en.wikipedia.org/?curid=" + this.pageid + "'><div class='result-box'><h5><b>" + this.title + ":</b></h5><p> " + this.extract + "</p></div></a>";
                    $(".message").append(htmlString);
                    $("#footer").fadeOut(1000);

                });

            });
        //in case of empty text field
        } else {
            $(".message").append("<h2>Nothing entered</h2>");   
        }
    }
}