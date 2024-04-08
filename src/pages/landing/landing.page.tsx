import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../routes/paths';

export default function LandingPage() {
   const navigate = useNavigate();

   useEffect(() => {
      navigate(paths.cubex);
   });

   return <div>Landing App Page. Hello World!</div>;
}
