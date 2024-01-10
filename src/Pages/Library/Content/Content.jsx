import React, {useEffect, useState} from 'react'
import Books from './AllBooks/Books';
import Recommendations from './Recommendations/Recommendations';
import FindBook from './FindBook/FindBook';
import AddBook from '../../../components/Modals/AddBook/AddBook'
import Search from './SearchByGenre/Search';

const Content = ({page}) => {
    let content = null
    const [open, setOpen] = useState(false)

    switch (page) {
        case 'library':
          content = <div><Books/></div>;
          break;
        case 'recommendations':
          content = <div><Recommendations /></div>;
          break;
        case 'addbook':
          content = <div><FindBook /></div>;
          break;
        case 'applybook':
          break;
        case 'stats':
          content = <div>Statistics Page Content</div>;
          break;
        case 'manage':
          content = <div>Manage Page Content</div>;
          break;
        case 'findbygenre':
          content = <div><Search /></div>
          break;
        default:
          content = <div>Page Not Found</div>;
      }
    
      return(
        <div>
          {content}
          <AddBook show={open} onHide={() => setOpen(false)}/>
        </div>
      ) 
}

export default Content