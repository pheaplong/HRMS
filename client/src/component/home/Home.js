import React, { useRef, useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
import { TweenMax, Power3, TweenLite } from 'gsap'
import GlobalLibrary from '../../helper/GlobalLibrary'
import Axios from 'axios'
import $ from 'jquery'
const Home = () => {
  let p = useRef(null)
  const [state, setState] = useState([])
  const jstree = useRef(null)
  useEffect(() => {
    TweenMax.from(p, 2, { opacity: 0, ease: Power3.easeOut })

    return () => {
    }
  }, [])
  return (
    <div>
      <div id="jstree" ref={jstree} onClick={(e) => {
        console.log(e);
      }}></div>
      <p ref={e => { p = e }}>askljdklaslkj klasjdkaks Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid reprehenderit voluptate facere illum temporibus! Fugiat totam odio, eius optio minima aspernatur itaque, quam, atque nam accusantium cupiditate temporibus impedit nemo?
      Corrupti libero officiis aut sit natus debitis totam quam cumque veniam quisquam aspernatur eligendi repellat nobis voluptatum consectetur assumenda, eveniet, omnis, temporibus distinctio. Maxime nam voluptas nesciunt facilis ex! Dolorum.
      Quo saepe vel atque quisquam aliquid, voluptas vitae nisi dolore voluptate sequi illo unde distinctio provident culpa est debitis deleniti veniam. Saepe facere quidem cum consequatur laudantium. Ratione, facilis obcaecati?
      Molestias cumque, consequatur rerum alias quo dolores nesciunt et sunt culpa quis numquam eius voluptas repellendus odit non quae, facere provident? Tenetur molestiae hic nobis eaque rem accusantium, odio deleniti.
      Voluptatem amet aspernatur et excepturi impedit! Eveniet cumque molestias accusamus quidem at officia harum exercitationem! Facilis consequuntur numquam alias amet cupiditate quo unde voluptatum eos delectus ea rerum, perspiciatis eum.
      Accusamus eaque labore, voluptatibus accusantium fugiat incidunt recusandae veritatis ducimus! Consectetur deleniti eaque amet fugit sit. Dignissimos, tempore maiores beatae placeat esse iusto in corrupti, officiis minima quam mollitia reprehenderit?
      Ducimus perferendis hic corporis ipsum, vitae nulla id reprehenderit ullam, cupiditate itaque nihil exercitationem incidunt conseq uuntur sed  provident nam rerum, ea dicta alias. Delectus provident quo aliquam earum magnam?
      Ad libero, aliquam ab nulla sequi et. Ullam ab, eius fuga accusamus quibusdam commodi. Necessitatibus iusto ipsam aliquid veniam cupiditate itaque obcaecati praesentium laboriosam atque officia, dolore qui voluptates ducimus!
      Mollitia laudantium harum amet, laborum, reiciendis adipisci magni veritatis iure perferendis, eveniet quo illum quisquam magnam cum. Architecto voluptatem assumenda ex sit iusto facere dignissimos, repudiandae commodi quisquam veritatis quidem.
         Beatae consectetur repellendus nesciunt, quo libero error asperiores. Qui provident, corrupti odio iste voluptates, natus placeat accusantium deleniti quia magni quo repudiandae voluptatum itaque odit omnis suscipit libero ex esse.  aklsdlojas</p>
      {/* <p>{state[0].dep_name}</p> */}
    </div>
  )
}

export default Home
