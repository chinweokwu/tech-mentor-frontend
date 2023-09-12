import { Menu} from 'antd';
const Navbar = ({ activeMenuItem, onMenuClick }) => {
  const handleMenuClick = (e) => {
    onMenuClick(e.key);
  };
  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[activeMenuItem]} onClick={handleMenuClick}>
      <Menu.Item key="anime" >Animes</Menu.Item>
      <Menu.Item key="manga" >Manga</Menu.Item>
    </Menu>
  )
}

export default Navbar