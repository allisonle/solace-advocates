import Logo from "@/assets/logo";

const Header = () => (
  <div className="w-full p-4 md:p-0">
    <div className="w-1/2 md:w-1/4">
      <Logo />
      <div className="text-secondary-foreground font-light">
        Find your care advocate
      </div>
    </div>
  </div>
);

export default Header;
