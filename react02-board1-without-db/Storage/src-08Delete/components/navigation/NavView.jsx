import React from "react";

function NavView(props) {
  return (
    <nav>
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={function(event) {
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>&nbsp;
      <a href="/" onClick={function(event) {
        event.preventDefault();
        /* HTML에서는 confirm 함수 앞에 window 객체를 생략하지만 JSX에서는 추가해야 한다. */
        if(window.confirm('삭제할까요?')) {
          props.onChangeMode('delete');
        }
      }}>삭제</a>
    </nav>
  );
}

export default NavView;