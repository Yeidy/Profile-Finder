
/* Segunda parte */

const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");

const client_id = "Iv1.a50fff675ff09bdc";
const client_secret = "86abc79c3cf4b68466f37dbf5966cd853d494b3a";


const fetchUsers = async(nameOfUser) => {
    const api_call = await fetch(`https://api.github.com/users/${nameOfUser}?client_id=${client_id}&
    client_secret=${client_secret}`);

    const datos = await api_call.json();
    return { data: datos}
};

const fetchRepos = async(nameOfUser) =>{
    const repo_call = await fetch(`https://api.github.com/users/${nameOfUser}/repos?client_id=${client_id}&
    client_secret=${client_secret}`);

    const datos_repo = await repo_call.json();
    return { data: datos_repo}
}

function status(response) {
    if (response.status != 404) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

const showData = () => {
    fetchUsers(inputValue.value)
        .then(status)
        .then((response) => {  
            console.log(response)
            if (response.data.public_repos != 0) {
                fetchRepos(inputValue.value).then((res) => {
                    console.log(res);
                    let table = document.querySelector("table");
                    let data = Object.keys(res.data[0]);
                    generateTableHead(table, data);
                    generateTable(table, res.data);
                });
            }
            else{
                console.log('No exist public repositories!');
                alert ('No exist public repositories!')
            }  ;         
        })
        .catch((err) => {
            console.log('Error Status', err);
        });
};

searchButton.addEventListener("click", () => {
    showData();
})


function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}


  


/* primera parte  */

const inventors = [
    { first : 'Albert' , last : 'Einstein' , year : 1879 , passed : 1955 },
    { first : 'Isaac' , last : 'Newton' , year : 1643 , passed : 1727 },
    { first : 'Galileo' , last : 'Galilei' , year : 1564 , passed : 1642 },
    { first : 'Marie' , last : 'Curie' , year : 1867 , passed : 1934 },
    { first : 'Johannes' , last : 'Kepler' , year : 1571 , passed : 1630 },
    { first : 'Nicolaus' , last : 'Copernicus' , year : 1473 , passed : 1543 },
    { first : 'Max' , last : 'Planck' , year : 1858 , passed : 1947 },
    { first : 'Katherine' , last : 'Blodgett' , year : 1898 , passed : 1979 },
    { first : 'Ada' , last : 'Lovelace' , year : 1815 , passed : 1852 },
    { first : 'Sarah E.' , last : 'Goode' , year : 1855 , passed : 1905 },
    { first : 'Lise' , last : 'Meitner' , year : 1878 , passed : 1968 },
    { first : 'Hanna' , last : 'Hammarström' , year : 1829 , passed : 1909 }
    ];
    
    /* inventors born in the 1500's */
    let inventores = inventors.filter(
        inventores => inventores.year > 1500 && inventores.year < 1600  );
    console.log(inventores);
    console.log('1');
    
    /* List of names and last names */
    
    inventors.forEach(inventores =>{
        return console.log('name:' + inventores.first + '  lastname:' + inventores.year)
    })
    console.log('2');
    
    /* List of birthdate (oldest to younger)*/
    
    let people = inventors.sort(function(a,b){
        return (a.year-b.year); 
      });
      
    people.forEach(people => console.log('name:' + people.first + ' birthdate:' + people.year));
    console.log('3');
    
    /* List of years lived)*/
    
    inventors.forEach(x => {
        let vida = x.passed - x.year;
        console.log(x.first + ' lived ' + vida + ' years');
      })
    console.log('4');