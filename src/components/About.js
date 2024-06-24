import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


//=> That's how we can use the api contexts.......
const About = () => {
  // const a = useContext(noteContext)
  // useEffect(()=>{
  //   a.update();
  //   // eslint-disable-next-line
  // }, [])
  return (
    <div>
      This is about About
    </div>
  )
}

export default About
