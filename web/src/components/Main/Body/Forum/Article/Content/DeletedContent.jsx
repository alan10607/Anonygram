import DeletedInfo from './Info/DeletedInfo';
import './Content.scss';

export default function DeletedContent({ id, no }) {

  return (
    <div id={`${id}_${no}`} className="cont">
      <DeletedInfo id={id} no={no} />
    </div>
  )
}