import SectionTitleProps from '../interface/SectionTitleProps';

export default function SectionTitle(props: SectionTitleProps) {
  const { title } = props;
  return (
    <div className='text-3xl font-bold'>{title}</div>
  )
}
