import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Customer from './Components/Customer/Customer'
// import Profile from './profile'


//  function versi terbaru 
function App() {

  // di tempat ini untuk buat logika jangan di dalam return
  const a = 10;
  const b = 20;
  console.log(a + b);
  
 
  return (
    <>
     <Header/> 

    <h1>To-do List: &rarr; &#9728; </h1>
    <ol>
      <li>&clubs;  Mengerjakan tugas front-end</li>    
      <li>&spades; Mempelajari tutorial react js</li>
      <li>&diams; Murojaah</li>
    </ol>   

     {/* <Profile nama = "Ahmad" alamat={"Kalimantan Barat"} umur = "20"/>
    <Profile nama = "Raa" alamat={"Kalimantan Barat"} umur = "20"/>  */}
    {/* profile dua yaitu bisa memanggil 2 kali dengan nama dan lain lain yang berbeda  */}
    
    <img src="https://picsum.photos/200/300" alt="gambar" />
    { <Footer nama = "Farsa"/> }
            
            <h2>Our Customer</h2>
            <Customer nama={"Ucup"} alamat={"Depok"} membership={"Premium"}/>

         

         <Customer nama={"Joko"} alamat={"Jakarta"} membership={"Gold"}/>
          
      
          <Customer nama={"Agus"} alamat={"Bandung"} membership={"Platinum"}/>



     
    </>
  )
}

export default App

//  Ini versi yang terlama Class

// class Footer extends Component {
//   render() {
//     return(
//       <footer>
//         <h3>Copyright &copy;2026 Developed by Ahmad fathurrahman Ramdhani &#10003; </h3>
//         <span>Make with &#10084; &#128152; &#9733;</span>
//       </footer>
//     )
//   }
// }

