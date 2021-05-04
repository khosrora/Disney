import { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { auth, provider } from './../firebase';
import {
    selectUserName,
    selectUserPhoto,
    setSignOutState,
    setUserLoginDetails,
} from "../features/user/userSlice"



const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                history.push("/home");
            }
        })
    }, [])

    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider)
                .then((result) => {
                    setUser(result.user);
                })
                .catch(err => {
                    alert(err.message);
                })
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                history.push('/');
            })
                .catch((err) => alert(err.message))
        }

    }

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }))
    }




    return (
        <Nav>
            {
                !userName
                    ? <Login onClick={handleAuth}>ورود</Login>
                    : <>
                        <SignOut>
                            <UserImg src={userPhoto} alt={userName} />
                            <DropDown>
                                <span onClick={handleAuth}>خروج</span>
                            </DropDown>
                        </SignOut>
                        <NavMenu>
                            <a href="/home">
                                <span>جست و جو</span>
                                <img src="/images/search-icon.svg" alt="HOME" />
                            </a>
                            <a href="/home">
                                <span>دیده شده ها</span>
                                <img src="/images/watchlist-icon.svg" alt="HOME" />
                            </a>
                            <a href="/home">
                                <span>جدید</span>
                                <img src="/images/original-icon.svg" alt="HOME" />
                            </a>
                            <a href="/home">
                                <span>سینمایی</span>
                                <img src="/images/movie-icon.svg" alt="HOME" />
                            </a>
                            <a href="/home">
                                <span>سریال ها</span>
                                <img src="/images/series-icon.svg" alt="HOME" />
                            </a>
                            <a href="/home">
                                <span>خانه</span>
                                <img src="/images/home-icon.svg" alt="HOME" />
                            </a>
                        </NavMenu>

                    </>
            }
            <Logo>
                <img src="/images/logo.svg" alt="" />
            </Logo>
        </Nav>
    )
}

const Nav = styled.nav`
position : fixed;
top:0;
right:0;
left:0;
height:70px;
background-color : #090b13;
display:flex;
justify-content : space-between;
align-items : center;
padding : 0 36px;
z-index :3;
`;

const Logo = styled.a`
padding : 0;
width : 80px;
margin-top :4px;
max-height : 70px;
display : inline-block ;
img {
    display : block ;
    width  : 100%;
}
`;

const NavMenu = styled.div`
align-items : center;
display : flex ;
flex-flow : row nowrap;
height : 100%;
justify-content : flex-end;
margin : 0px;
padding : 0px;
position : relative;
margin-left : auto;
margin-right : 25px;

a {
    display : flex ;
    align-items : center ; 
    padding : 0 12px;
    img {
        height : 20px;
        min-width : 20px ;
        width :20px;
        z-index: auto;
    }
    
    span {
        color : rgba(249,249,249);
        font-size : 13px;
        letter-spacing : 1.42px;
        line-height : 1.88;
        padding : 2px 0px;
        white-space : nowrap;
        position : relative;
        &:before {
            background-color : rgb(249,249,249);
            border-radius : 0px 0px 4px 4px;
            bottom : -6px;
            content : "";
            height : 2px;
            left :0px;
            opacity : 0;
            position: absolute;
            right : 0px ;
            transform-origin : left center;
            transform : scaleX(0);
            transition : all 250ms cubic-bezier(0.25 , 0.46 , 0.45 , 0.96);
            visibility : hidden;
            width : auto;
        }
    }
    
    &:hover {
        span:before {
            transform : scaleX(1);
            visibility : visible;
            opacity : 1 !important;
        }import { selectUserEmail } from './../features/user/userSlice';
    }

    /* @media (max-width : 768px) {
     display :none;
    }*/
}
`;

const Login = styled.a`
background-color :rgba(0,0,0,0.3);
padding : 8px 35px;
border : 1px solid #f9f9f9;
border-radius : 4px;
transition : all .6s ease 0s;
cursor:pointer;
&:hover {
    background-color : #f9f9f9;
    color : #000;
    border-color : transparent;
}
`;

const UserImg = styled.img`
height : 100%;
`;

const DropDown = styled.div`
position : absolute;
top:30px;
left:0px;
background : rgba(19,19,19 , .6);
border: 1px solid rgba(151,151,151,0.34);
border-radius : 4px;
box-shadow:rgb(0 0 0 /50%) 0px 0px 18px 0px;
padding : 10px 40px;
font-size : 14px;
letter-spacing : 3px;
opacity:0;
`;


const SignOut = styled.div`
position : relative;
height : 40px;
width : 40px;
display:flex;
cursor:pointer;
align-items:center;
justify-content : center;
${UserImg} {
    border-radius : 50%;
    width :100%;
    height : 100%;
}

&:hover {
    ${DropDown}{
        opacity : 1;
        transition-duration : 1s; 
    }
}

`;

export default Header;


