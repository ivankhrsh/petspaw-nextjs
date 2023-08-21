import { Paw, PetsPaw } from "@/public/svg";
import './page.scss'
import { Button } from "@/components/Button/Button";

export default function Home() {
  return (
    <main>
      <div className="logo">
        <Paw/>
        <PetsPaw/>
      </div>

    <div>
      <h1 className="title">Hi!👋</h1>
      <h2 className="welcomeMessage">Welcome to MacPaw Bootcamp 2023</h2>
    </div>

      <div className="navigationLinks">
        <h2 className="linksTitle">Lets start using The Cat API</h2>
        <Button link="/voting" text="Voting"/>
        <Button link="/breeds" text="Breeds"/>
        <Button link="/gallery" text="Gallery"/>
      </div>
    </main>
  )
}
