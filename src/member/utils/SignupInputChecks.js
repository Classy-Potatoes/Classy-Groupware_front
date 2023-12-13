import {toast} from "react-toastify";


export const signupInputChecks = ( form, imageInput ) => {

    if( form.infoCode === "" ) {
        toast.dismiss();
        toast.warning('사원번호를 입력해주세요.', {
            autoClose : 1000
        });
    } else if( form.memberId === "" || !/^[a-zA-Z0-9]+$/.test( form.memberId ) ) {

        if ( form.memberId === "" ) {
            toast.dismiss();
            toast.warning('아이디를 입력해주세요.', {
                autoClose : 1000
            });
        } else {
            toast.dismiss();
            toast.warning('한글을 제외한 다른 문자로 아이디를 입력해주세요.', {
                autoClose: 1000
            });
        }

    } else if( form.memberPassword === ""
        || form.memberPasswordCheck === ""
        || form.memberPassword !== form.memberPasswordCheck ) {

        if ( form.memberPassword === "" || form.memberPasswordCheck === "" ) {
            toast.dismiss();
            toast.warning('비밀번호를 입력해주세요.', {
                autoClose : 1000
            });
        } else {
            toast.dismiss();
            toast.warning('비밀번호가 같지 않습니다.', {
                autoClose : 1000
            });
        }
    } else if ( form.infoPhone === "" ) {

        toast.dismiss();
        toast.warning('휴대번호를 입력해주세요.', {
            autoClose : 1000
        });

    } else if( form.infoEmail === "" || !/^[a-zA-Z0-9]+$/.test( form.infoEmail ) ) {

        if ( form.infoEmail === "" ) {
            toast.dismiss();
            toast.warning('이메일을 입력해주세요.', {
                autoClose : 1000
            });
        } else {
            toast.dismiss();
            toast.warning('이메일에 한글을 작성하실수 없습니다.', {
                autoClose: 1000
            });
        }

    } else if( form.infoAddress === "" ) {

        toast.dismiss();
        toast.warning('주소를 입력해주세요.', {
            autoClose : 1000
        });
    } else if( form.infoAddressAdd === "" ) {

        toast.dismiss();
        toast.warning('상세 주소를 입력해주세요.', {
            autoClose : 1000
        });
    } else if( !imageInput.current.files[0] ) {

        toast.dismiss();
        toast.warning('프로필 사진을 선택 해주세요.', {
            autoClose : 1000
        });
    } else {

        // form.infoEmail = form.infoEmail + form.emailUrl;

        return form;
    }

}