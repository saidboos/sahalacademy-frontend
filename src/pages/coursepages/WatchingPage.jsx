import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'

//API
import services from '../../services/common.services'

//CSS
import '../../assets/styles/watch.css';

//IMAGES
import noFound from '../../assets/img/no_rec.png'

//Classes
import course1 from './model/Course'
import { useLocation } from 'react-router';

const WatchingPage = (props) => {

    const location = useLocation();
    const [course, setCourse] = useState({});
    const [videos, setVideos] = useState([])
    const [videoUrl, setVideoUrl] = useState('')
    const [title, setTitle] = useState('')

    const ref = useRef(null);

    const [isActive, setActive] = useState(0);
    const toggle = (i) => {
        setActive(i);
    };


    useEffect(() => {



        if (location.state !== null) {
            // if (location.state !== null) setCourse(location.state.course);
            const mCourse = location.state.course;
            setCourse(mCourse)

            Swal.fire({
                title: 'Please wait',
                showConfirmButton: false,
                allowOutsideClick: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })

            const req = { courseId: mCourse.courseId };

            services.coursevideos(req)
                .then((res) => {
                    Swal.close();

                    setVideos(res.data.videos);
                    setVideoUrl(res.data.videos[0].vurl)
                    setTitle('1. ' + res.data.videos[0].vtitle)
                })
                .catch(err => console.log(err));
        }
        // const handleContextmenu = e => {
        //     e.preventDefault()
        // }


    }, [])



    const selectVideo = (index, video) => {
        setTitle((index + 1) + '. ' + video.vtitle)
        setVideoUrl(video.vurl)
        setActive(index)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }


    const context = () => {
        return false;
    }

    return (
        <div className='watch-container'>


            {/* LEFT */}
            <div className="left">
                <div className="course-img">
                    <img src={course.courseImage} alt="" />
                </div>
                
                { videoUrl ? videos.map((video, index) =>
                    <div key={index} className={`video ${isActive === index ? 'active' : ''}`} onClick={() => selectVideo(index, video)}>
                        <ion-icon name="play-circle"></ion-icon>
                        <p>{(index + 1) + '. ' + video.vtitle}</p>
                    </div>
                ) : null
            }
            </div>

            {
                videoUrl ?
                    <div className="right">
                        <div className="video-container">
                            <iframe id='myframe' onContextMenu={context} ref={ref} src={videoUrl} autoPlay={true} allowFullScreen></iframe>
                        </div>


                        <div className="video-title">
                            <p>{title}</p>
                        </div>
                    </div>

                    :

                    <div className="right">
                        <div className='no-found'>
                            <img src={noFound} alt="" />
                        </div>
                    </div>
            }


        </div>
    )
}

export default WatchingPage
