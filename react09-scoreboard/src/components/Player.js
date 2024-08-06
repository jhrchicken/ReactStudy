import { useState } from 'react';
import Counter from '../components/Counter';
import EditPlayerForm from './EditPlayerForm';

export default function Player(props) {

  let row = props.playerData;
  const [showEdit, setShowEdit] = useState(false);
  let editForm;

  if (showEdit === false) {
    editForm = '';
  }
  else {
    editForm = <EditPlayerForm playerName={row.name} playerIdx={row.idx}
      onEditPlayer={props.onEditPlayer}
      showEdit={showEdit} setShowEdit={setShowEdit} />;
  }

  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player"
          onClick={() => {
            if (window.confirm('삭제하시겠습니까?')) {
              props.onDeletePlayer(row.idx);
            }
          }}> x </button>
        <a href="/" onClick={(e) => {
            e.preventDefault();
            setShowEdit(!showEdit);
          }
        }>{row.name}</a>
      </span>
      {/* App 컴포너트에서 전달받은 점수변경 함수를 자식 컴포넌트로 전달 */}
      <Counter idx={row.idx} score={row.score} onChangeScore={props.onChangeScore} />
    </div>
    {editForm}
  </>);
}