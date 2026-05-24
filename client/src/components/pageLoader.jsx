import { BiLoaderAlt } from 'react-icons/bi';
function PageLoader() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <BiLoaderAlt className='size-10 animate-spin' />
    </div>
  );
}
export default PageLoader;
