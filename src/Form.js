import React from "react";
import swal from "sweetalert";

//setting the default state


const InitiaState = {
    name:"",
    Gender: "",
    nameError:"",
    
}

let futureStores = [

    'You will Marry soon',
    'you will move to London soon',
    'You will get $2000 job next month',
    'You will buy a black benz next year',
    
];

const getMaxVal = (values) => {
    //the values we passed here could be anything we decided to assign to it
    let curVal, maxVal = 0;
    //mapped through array of values
    values.forEach((val) => {
        //Looping through the values which here could be the futures or name of user and returning a function with val
        // console.log(val.count)
        //if its val.count return, else return val.vals.
        let valCount = val.count ? val.count : val.vals.count;
        //console.log(valCount)
        if (valCount > maxVal) {
            
            maxVal = valCount;
            //console.log(maxVal)
            curVal = val;
        }
    })
    return curVal
}

const getPredominatChar = (nameString) => {
    //Here ths function gets the predominant characters in a users name
    let nameChars = [], nameProps = [];

    nameString.split(' ').join('').split('').forEach(char => {
        //foreach loops through the users name and return them a string
        char = char.toLowerCase();
        //sort through the nameChar array of char with index less than zero
        if (nameChars.indexOf(char) < 0) {
            //push the name that is less than zero to this nameChars Array
            nameChars.push(char)
            //Push a destructured object of char(which are the names) and the count
            nameProps.push({ char, count:1 })


        } else {
            nameProps.forEach(prop => {
                //console.log(prop)
                if (prop.char === char)
                    prop.count++;
            })
            
               
        }

    });
    return getMaxVal(nameProps)
};


export default class Form extends React.Component{

     state= InitiaState;

    
   checkInput = ()=>{
       let fields = this.state.name;
       let nameError;
       //let regx = /^[a-zA-Z]+$/;
       let formIsValid= true;
     

       if(!fields){
           nameError = "Name cannot be blank"
       }

      /* if(fields.match(regx)){
           nameError = "Name Is Invalid"
       } */
      if(nameError){
          this.setState({nameError})
          return false;
      }
      

      return formIsValid
    
   }

    //This function here handles the submission of the form, the onsubmit evenlistener is attached to this function
    HandleSubmit = (event)=>{
        event.preventDefault();
        const ValidInput = this.checkInput()
        if(ValidInput){
           // console.log(this.state)
            //To clear the form onsubmit
            this.setState(InitiaState)
            //console.log(this.state.name)
        }  
        let fields = this.state.name;
        //fields = this.checkInput(name);
        //console.log(fields)

        if (fields) {
            let curVal = getPredominatChar(fields);
          // console.log(namePredominantVal)


            //Here we are getting the predominant future

            let futurePredominantVals = futureStores.map(store => (
                { future: store, vals: getPredominatChar(store) }
            ));

            let futurePredominantVal = getMaxVal(futurePredominantVals);

            if (curVal.char === futurePredominantVal.vals.char) {
                swal(`${'Hi'+" " + fields}`+" " +futurePredominantVal.future);
            }
            else{
            swal( "Please we do not have a response for you.")
            }
        }

        

        
        
    }

    handleChange=(event)=>{
       this.setState({name: event.target.value})
       
    }
    handleBlur =(event)=>{
        //This handles the triming of white spaces
        const attribute = event.target.getAttribute('name')
        this.setState({[attribute]:event.target.value.trim()})
        
        
    }
    
    handleGenderChange =(event)=>{
        this.setState({Gender:event.target.value})
        
    } 

    render(){
        return(
            <div className="search-params">
            <h1 className="heading">Yo Future</h1>
                <form onSubmit={this.HandleSubmit}>
                    <div className="form-control success">
                        <label htmlFor="name">
                            Name
                            <input type="text" placeholder="" name="name" value={this.state.name} id="Input-tag" onChange={this.handleChange}
                            onBlur={this.handleBlur}/>
                            <span className="nameError">{this.state.nameError}</span>
                           

                            
                        </label>
                        
                        
                    </div>
                    
                    <div className="form-gender">
                    <label htmlFor="gender">
                        Gender
                        <select id="gender" value={this.state.Gender} onChange={this.handleGenderChange}>
                            <option>..</option>
                            <option>Male</option>
                            <option>Female</option>
                            
                        </select>
                    </label>
                        
                    </div>
                    
                  <button onClick={this.HandleSubmit}>Submit </button>
                </form>

                <footer className="footer_header">
                        <p className="footer_Intro">Built by <a href="https://twitter.com/home">Chris Uche</a></p>
                    <p className="copy">Copyright 2021. All Rights Reserved</p>
                </footer>

            </div>

          
                
        
        )
    }



}