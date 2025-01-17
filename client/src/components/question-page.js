import React from 'react';
import {connect} from 'react-redux';
import Logo from './logo';
import {Link} from 'react-router-dom';
import {getLessons, logon, pickLesson} from '../actions';
import {displayError} from '../actions/index2';
import {push} from 'react-router-redux';
import {setJWT} from '../actions/index2'
import './question-page.css';
import './float-grid.css';

class QuestionPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lesson:null
        }
    }

    componentDidMount() {
        this.props.dispatch(getLessons(this.props.jwt.authToken))
    }
        

    render() {
        let lessonPlan;
        const {dispatch,lesson,jwt,questions,userId,style} = this.props;
        let display = {
            display:style,
            color:'red'
        }
        if ( questions) {
            lessonPlan = questions.map((lesson,index) =>  <option onSelect={(e) => console.log('loook',e.target.value)}key={lesson.language} 
                value={index} className='lesson' style={{ color:'black'}}>{lesson.language}</option>)
        }

        return (
            <div id='question-container' >
                 <div className='logout-box'> 
                    <Link to='/'><button className='logout-button' onClick={()=>{
                        dispatch(setJWT(null))    
                    }}>Logout</button></Link>
                </div>
                <Logo />
                <div className='question-box' >
               
                    <h3 className='omega' >What would you like to practice today?</h3>
                    <div className='inner-container row' style={{display:'block'}}>
                        <select className='select-box' style={{color:'black'}}onChange={(e) =>{
                            dispatch(pickLesson(e.target.value))}}>
                            <option style={{listStyle:'none', color:'black'}} value="''">Choose Lesson Below</option>
                            {lessonPlan}
                        </select>
                        <button className='start-button' onClick={() => {
                            if (lesson && lesson !== '') {
                                dispatch(push(`/${userId}/lesson`))
                            }
                            else {
                                dispatch(displayError())
                                setTimeout(function(){
                                    dispatch(displayError())
                                },2500)
                            }   
                        }}>Start</button>
                        
                    </div>    
                    <p className='pick-lesson-error' style={display}>You must pick a lesson before starting</p>
                </div>
            </div>
        );
    }  
}
const mapStateToProps = (state) => {
    return {
        userId:state.twoReducer.userId,
        jwt:state.learnReducer.jwt,
        questions:state.learnReducer.questions,
        lesson:state.learnReducer.lesson,
        style:state.twoReducer.style


    }
}

export default connect(mapStateToProps)(QuestionPage)
