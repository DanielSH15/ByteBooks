import React from 'react'
import Books from './AllBooks/Books';
import Recommendations from './Recommendations/Recommendations';

const Content = ({page}) => {
    let content = null
    switch (page) {
        case 'library':
          content = <div><Books/></div>;
          break;
        case 'recommendations':
          content = <div><Recommendations /></div>;
          break;
        case 'addbook':
          content = <div>Add Book Page Content</div>;
          break;
        case 'stats':
          content = <div>Statistics Page Content</div>;
          break;
        case 'manage':
          content = <div>Manage Page Content</div>;
          break;
        default:
          content = <div>Page Not Found</div>;
      }
    
      return <div>{content}</div>;
}

export default Content