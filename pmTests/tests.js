//! GET -ALL
const jsonData = pm.response.json();
pm.globals.set("pokemonCount", jsonData.count);

pm.test("Response is OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response should have correct message", function () {
    pm.expect(pm.response.json().message).to.eql(
        "All Pokemon fetched successfully"
    );
});

pm.test("Response should contain an array of Pokemon", function () {
    pm.expect(pm.response.json().pokemonList).to.be.an("array");
});

pm.test(
    "Number of Pokemon should match the count in the response",
    function () {
        pm.expect(pm.response.json().pokemonList.length).to.eql(
            pm.globals.get("pokemonCount")
        );
    }
);

//! GET -By Id
const jsonData = pm.response.json();
pm.globals.set("pokemonID", jsonData.pokemon._id);

pm.test("Response is OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response should have correct message", function () {
    pm.expect(pm.response.json().message).to.eql(
        "Pokemon fetched successfully"
    );
});

pm.test("Response should contain the correct Pokemon", function () {
    pm.expect(pm.response.json().pokemon._id).to.eql(
        pm.globals.get("pokemonID")
    );
});

//! POST
pm.test("Create new Pokemon", function () {
    pm.sendRequest(
        {
            method: "POST",
            url: "http://localhost:3000/pokemon",
            header: {
                "Content-Type": "application/json",
            },
            body: {
                mode: "raw",
                raw: JSON.stringify({
                    title: "Pikachu",
                    desc: "An electric-type Pokemon",
                }),
            },
        },
        function (err, res) {
            pm.expect(err).to.be.null;
            pm.expect(res).to.have.property("code", 200);
            pm.expect(res).to.have.jsonBody();
            pm.expect(res.json()).to.have.property("message", "Pokemon saved");
            pm.expect(res.json().pokemon).to.have.property("title", "Pikachu");
            pm.expect(res.json().pokemon).to.have.property(
                "desc",
                "An electric-type Pokemon"
            );
            pm.expect(res.json().pokemon).to.have.property("id");
            pm.expect(res.json().pokemon.metadata).to.have.property(
                "method",
                "POST"
            );
            pm.expect(res.json().pokemon.metadata).to.have.property(
                "host",
                "localhost:3000"
            );
        }
    );
});

//!  PUT
pm.test("Create new Pokemon", function () {
    pm.sendRequest(
        {
            method: "POST",
            url: "http://localhost:3000/pokemon",
            header: {
                "Content-Type": "application/json",
            },
            body: {
                mode: "raw",
                raw: JSON.stringify({
                    title: "Pikachu",
                    desc: "An electric-type Pokemon",
                }),
            },
        },
        function (err, res) {
            pm.expect(err).to.be.null;
            pm.expect(res).to.have.property("code", 200);
            pm.expect(res).to.have.jsonBody();
            pm.expect(res.json()).to.have.property("message", "Pokemon saved");
            pm.expect(res.json().pokemon).to.have.property("title", "Pikachu");
            pm.expect(res.json().pokemon).to.have.property(
                "desc",
                "An electric-type Pokemon"
            );
            pm.expect(res.json().pokemon).to.have.property("id");
            pm.expect(res.json().pokemon.metadata).to.have.property(
                "method",
                "POST"
            );
            pm.expect(res.json().pokemon.metadata).to.have.property(
                "host",
                "localhost:3000"
            );
        }
    );
});

//! Delete
pm.test("Delete a specific Pokemon by ID", function () {
    pm.sendRequest(
        {
            url:
                "http://localhost:3000/pokemon/" +
                pm.environment.get("pokemonId"),
            method: "DELETE",
        },
        function (err, res) {
            //* Ensure the response status code is 200 OK
            pm.expect(res.status).to.equal(200);
            //* Ensure the response body contains the message "Pokemon deleted"
            pm.expect(res.text()).to.include("Pokemon deleted");
        }
    );
});

//* Attempt to retrieve the deleted Pokemon by ID
pm.test("Attempt to retrieve the deleted Pokemon by ID", function () {
    pm.sendRequest(
        {
            url:
                "http://localhost:3000/pokemon/" +
                pm.environment.get("pokemonId"),
            method: "GET",
        },
        function (err, res) {
            //* Ensure the response status code is 404 Not Found
            pm.expect(res.status).to.equal(404);
            //* Ensure the response body contains the error message "Pokemon not found"
            pm.expect(res.text()).to.include("Pokemon not found");
        }
    );
});
