import DeletedWord from './Word/DeletedWord';
import DeletedInfo from './Info/DeletedInfo';
import './Content.scss';

export default function DeletedContent({ id, no }) {

  return (
    <div id={`${id}_${no}`} className="cont">
      <DeletedWord id={id} no={no} />
      <DeletedInfo id={id} no={no} />
    </div>
  )
}