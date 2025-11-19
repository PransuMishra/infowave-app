import React,{useState} from 'react';
import PropTypes from 'prop-types';

const NewsItem = (props)=> {

    let {title, description, imageUrl, url, author, date, source, mode} = props;

    const [isHovered, setIsHovered] = useState(false);
    
    const cardStyle = {
        backgroundColor: mode === 'dark' ? '#2c3034' : 'white', 
        color: mode === 'dark' ? 'white' : 'black', 
        borderRadius: '12px',
        boxShadow: mode === 'dark' ? '0 6px 20px rgba(0, 0, 0, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
        border: mode === 'dark' ? '2px solid #e3790fff' : 'none',
        transition: 'all 0.3s ease-in-out',
        height: 'auto', 
        overflow: 'hidden' 
    };

    const hoverStyle = {
        transform: 'translateY(-10px)', 
        boxShadow: mode === 'dark' 
            ? '0 8px 20px rgba(0, 0, 0, 0.6)' 
            : '0 8px 20px rgba(0, 0, 0, 0.15)',
    };

    const combinedStyle = {...cardStyle, ...(isHovered ? hoverStyle : {})};


    return (
      <div className="my-3">
        <div className="card" style={combinedStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
        >
        
          <div style ={{
            display : 'flex',
            justifyContent : 'flex-end',
            position : 'absolute',
            right : '0',
            zIndex: 10 
          }}
          >
              <span className="badge rounded-pill bg-danger"
              style={{
                    borderTopRightRadius: '12px', 
                    borderBottomLeftRadius: '12px', 
                    fontSize: '0.75rem',
                    padding: '0.5rem 0.8rem',
                    marginTop: '-1px', 
                    marginRight: '-1px'
                }}
              >{source}</span>
          </div>
          <img src={!imageUrl?"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDIRkGtdFdY228aa-vNNKiC3YtuNLy9RFhGkV5rPQnCRIsn9F8VeXn1BSG4MRdpMeYvp8Rorj655APxGadzrQab-5By6vX8TqUnXvtlp0BCQLsFzMsPjZ6HufN3SLkqr2LjXdsJxKVaEZNv6HNlUZvoqMDswKN8rYGHsAKqjTHazW7SHA5jW_GF9FQ4PM/s0/luxury-tropical-villa-modern-architecture.jpg":imageUrl} className="card-img-top" alt="..."
            style={{
                height: '200px', 
                objectFit: 'cover', 
                borderTopLeftRadius: '12px', 
                borderTopRightRadius: '12px' 
            }}
            />
            <div className="card-body" style={{padding: '1.5rem'}}>
              
              <h5 className="card-title" style={{fontWeight: '700', marginBottom: '0.75rem', lineHeight: '1.3', fontSize: '1.15rem'}}>{title}
                
              </h5>
              <p className="card-text" style={{marginBottom: '1rem'}}>{description}</p>
              <p className="card-text mb-3">
                <small style={{color: mode === 'dark' ? '#adb5bd' : '#6c757d', fontSize: '0.8rem'}}>
                    By {!author?"Unknown":author} on {new Date(date).toGMTString()}
                </small></p>
                <a href={url} target='_blank' rel="noreferrer" className={`btn btn-sm btn-${mode === 'dark' ? 'outline-light' : 'dark'}`}>Read More</a>
          </div>
        </div>
      </div>
    );
  }


  NewsItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    source: PropTypes.string,
    mode: PropTypes.string.isRequired
}


export default NewsItem;