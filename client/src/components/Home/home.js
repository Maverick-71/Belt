import React from 'react';
//Elementos 
import MenuAppBelt from './../genericos/menu';
import FooterBelt from './../genericos/pie';

class Home  extends React.Component{
    render(){
        return(
            <div>
                <header>
                    <MenuAppBelt />
                </header>

                <section name="cuerpo">
                
                </section >

                <FooterBelt />
            </div>
        )
    }
}

export default Home;