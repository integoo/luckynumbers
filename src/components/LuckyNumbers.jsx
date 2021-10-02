import React from 'react'

import './LuckyNumbers.css'

class LuckyNumbers extends React.Component{
    constructor(props){
        super(props)

        this.state={
            randomNumbers:[],
            ip:"",
            city:"",
            region:"",
            country:"",
            continent:"",
            latitude: "",
            longitude: "",
            currency: "",
            currencyConverter: "",
        }
    }

    async componentDidMount(){
        const url = `http://www.geoplugin.net/json.gp`
        try{
            const response = await fetch(url)
            const data = await response.json()
            // alert(JSON.stringify(data))
            alert(data.geoplugin_request+" "+data.geoplugin_city+" "+data.geoplugin_regionName+" "+data.geoplugin_countryName+" "+data.geoplugin_continentName+" "+data.geoplugin_latitude+" "+data.geoplugin_longitude+" "+data.geoplugin_currencyCode+" "+data.geoplugin_currencyConverter)
            this.setState({
                ip: data.geoplugin_request,
                city: data.geoplugin_city,
                region: data.geoplugin_regionName,
                country: data.geoplugin_countryName,
                continent: data.geoplugin_continentName,
                latitude: data.geoplugin_latitude,
                longitude: data.geoplugin_longitude, 
                currency: data.geoplugin_currencyCode,
                currencyConverter: data.geoplugin_currencyConverter,
            },() => this.handlePostAccesos())
        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
    }

    handlePostAccesos = async() =>{
        const ip = this.state.ip 
        const city = this.state.city 
        const region = this.state.region 
        const country = this.state.country 
        const continent = this.state.continent 
        const latitude = this.state.latitude 
        const longitude = this.state.longitude 
        const currency = this.state.currency 
        const currencyConverter = this.state.currencyConverter

        const url = `http://localhost:4010/api/grabaaccesos`

        const json={
            ip: ip,
            city: city,
            region: region,
            country: country,
            continent: continent,
            latitude: latitude,
            longitude: longitude,
            currency: currency,
            currencyConverter: currencyConverter
        }

        try{
            const response = await fetch(url,{
                method: "POST",
                body: JSON.stringify(json),
                headers:{
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            alert(data.message)

        }catch(error){
            console.log(error.message)
            alert(error.message)
        }
    }

    handleSpin = ()=>{
        let arreglo = []
        let i = 0
        while(i < 6){
            const randomNumber = Math.floor(Math.random() * 56 +1)
            if(!arreglo.find( element => parseInt(element) === parseInt(randomNumber))){
                arreglo[i] = randomNumber
                i+=1
            }
            arreglo = arreglo.sort((a,b) => a - b)

        }
                this.setState({
                    randomNumbers: arreglo,
                })
                document.querySelector("#i0").style.visibility="hidden"
                document.querySelector("#i1").style.visibility="hidden"
                document.querySelector("#i2").style.visibility="hidden"
                document.querySelector("#i3").style.visibility="hidden"
                document.querySelector("#i4").style.visibility="hidden"
                document.querySelector("#i5").style.visibility="hidden"

                setTimeout(()=> {document.querySelector("#i0").style.visibility="visible"},1000)
                setTimeout(()=> {document.querySelector("#i1").style.visibility="visible"},2000)
                setTimeout(()=> {document.querySelector("#i2").style.visibility="visible"},3000)
                setTimeout(()=> {document.querySelector("#i3").style.visibility="visible"},4000)
                setTimeout(()=> {document.querySelector("#i4").style.visibility="visible"},5000)
                setTimeout(()=> {document.querySelector("#i5").style.visibility="visible"},6000)

    }

    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <div className="main">
                        <h1 id="titulo">MY LUCKY NUMBERS ! ! !</h1>
                        <br />
                        <div className="mainNumbers">
                            <input id="i0" value={this.state.randomNumbers[0]} readOnly/>
                            <input id="i1" value={this.state.randomNumbers[1]} readOnly/>
                            <input id="i2" value={this.state.randomNumbers[2]} readOnly/>
                            <input id="i3" value={this.state.randomNumbers[3]} readOnly/>
                            <input id="i4" value={this.state.randomNumbers[4]} readOnly/>
                            <input id="i5" value={this.state.randomNumbers[5]} readOnly/>
                        </div>
                        <button className="btn btn-success" style={{fontWeight: "bolder", color:"yellow"}} onClick={this.handleSpin}>PRESS FOR GOOD LUCK</button>
                        <br />
                        <br />
                        <br />
                        <br />
                        <form action="https://www.paypal.com/donate" method="post" target="_top">
                            <input type="hidden" name="hosted_button_id" value="J44RE3Y6QNTEL" />
                            <input type="image" src="https://www.paypalobjects.com/en_US/MX/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                            <img alt="" border="0" src="https://www.paypal.com/en_MX/i/scr/pixel.gif" width="1" height="1" />
                        </form>



                    </div>






                </div>
            </React.Fragment>
        )
    }
}
export default LuckyNumbers