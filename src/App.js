import React, {useState, useEffect, useCallback} from 'react';
import KakaoLogin from "react-kakao-login";

const App = () => {

    const [state, setState] = useState(null);
    console.log(state);

    const [visible, setVisible] = useState(false);
    console.log(visible)

    const token = '{{ JAVASCIPRT KEY }}';

    // Kakao Login
    const responseKakao = (res) => {
        console.log(res)
        setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            profileImage: res.profile.kakao_account.profile.profile_image_url,
        })
    }

    useEffect(() => {
        if (state) {
            console.log('동작')
            setVisible(true)
        }
    }, [state]);


    const getProfile = useCallback(() => {
        if (visible && state.profileImage) {
            return <img src={state.profileImage} alt="뷐!"/>
        }
    }, [state, visible]);

    // Login Fail
    const responseFail = (err) => {
        console.error(err);
    }

    return (
        <div>
            <KakaoLogin
                token={token}
                onSuccess={responseKakao}
                onFail={responseFail}
                onLogout={console.info}
                render={({ onClick }) => {
                    return (
                        <>
                            {!visible
                            ? <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClick();
                                    }}
                                >
                                    카카오 ~ 로그인 ~
                                </button>
                            : null
                            }
                        </>
                    );
                }}
            />
            {getProfile()}
        </div>
    );
};

export default App;