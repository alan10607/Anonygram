import './content.scss';
import DeletedBar from './Bar/DeletedBar';
import DeletedWord from './Word/DeletedWord';
import DeletedInfo from './Info/DeletedInfo';

export default function DeletedContent({ id, no }) {

  return (
    <div id={`${id}_${no}`} className="cont">
      <DeletedBar id={id} no={no} />
      <DeletedWord id={id} no={no} />
      <DeletedInfo id={id} no={no} />
    </div>
  )
}