import React from 'react';
import './login-page.css';
import {connect} from 'react-redux';
import './about-us.css';

export class AboutUs extends React.Component {
    

    render() {
        return (
            <div className='about-us'>
                <h2 className='about-heading'>About Us...</h2>
                <div className='about-container'>
                    <ul className='aboutUs'>
                        <li className='aboutUs'>Practice, practice, practice!</li>
                        <li className='aboutUs'>Inside you'll find 
                        subjects to practice and if you don't find one you need, soon
                        you will be able to create your own lesson!</li>
                        <li className='aboutUs'>Try our Demo, Sign Up, or Login and choose a subject to begin!</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return{

    }
}
export default connect(mapStateToProps)(AboutUs)