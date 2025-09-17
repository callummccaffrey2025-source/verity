export default function PageHeader({title,subtitle}:{title:string;subtitle?:string}){
  return(<div className="mb-4"><h1 className="font-extrabold">{title}</h1>{subtitle&&<p className="mt-2">{subtitle}</p>}</div>);
}
