import AOSClient from "@/components/common/AOSClient";
import InstallModel from "@/models/install/install_model";
import InstallButton from "./(comps)/install_button";
import { isLogged } from "@/functions/auth/token";
import LoginDialog from "./(comps)/LoginDialog";
import UninstallButton from "./(comps)/unistall_button";

const InstallSoftware = async () => {
  const installed = await InstallModel.isInstalled();
  const logged = isLogged();
  // await InstallModel.uninstall();

  if (installed) {
    return <UninstallButton logged={logged} />;
  }
  return (
    <div className="min-h-[100svh] fullcenter select-none">
      <AOSClient />
      <img
        src="/images/logo.svg"
        data-aos="zoom-in"
        className="h-32 my-5"
        alt=""
      />

      <h1
        className="text-3xl font-extralight"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Let&apos;s Setup the software
      </h1>
      {logged && <InstallButton />}
      <LoginDialog visible={!logged} />
      <div className="fixed fullcenter bottom-0 w-full py-6">
        <a href="https://ziqx.cc">⚡ ziqx.cc</a>
      </div>
    </div>
  );
};

export default InstallSoftware;
