import { Component } from "react"

class Footer extends Component {
  render() {
    return(
      <footer>
        <h3>Copyright &copy;2026 Developed by {this.props.nama}  &#10003; </h3>  
        <span>Make with &#10084; &#128152; &#9733;</span>
      </footer>
    )
  }
}
export default Footer
// {this.props.nama} itu informasi tambahan fungsi nya agar component 
// menjadi lebih dinamis dan reusable 
// yang contoh itu props buatan sendiri