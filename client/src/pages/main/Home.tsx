import useAppSeo from '../../lib/hooks/useAppSeo';
import Vortex from '../../components/ui/Vortex';

const Home = () => {
  useAppSeo({
    title: 'Manipal OSL - Home',
    description: 'Track your attendance and explore the Manipal OSF initiative built for students, by students.',
  });

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Vortex
          baseHue={15}
          particleCount={500}
          rangeSpeed={2}
        />
      </div>
      <main>
        <div className="relative h-screen flex items-end pl-[5vw] pb-[10vh]">
          <h1 className="m-0 text-[15vw] font-light bg-gradient-to-r from-[#FF6B4A] to-accent bg-[length:250%_100%] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,107,74,0.5)] animate-[shimmer_5s_ease-in-out_infinite]">Manipal OSF</h1>
        </div>

        <div className="h-screen text-white mx-25 text-justify">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque molestias ea commodi repudiandae impedit nam nobis ab fuga harum eum soluta deleniti voluptate accusantium consequuntur voluptatem quisquam laborum dicta doloremque fugiat, id velit explicabo? Optio tempore maiores reprehenderit provident necessitatibus illo modi inventore veniam hic aspernatur, voluptatem, vero voluptas quia earum dicta consequatur numquam voluptate aut quasi accusamus repellendus culpa! Ad soluta odit quisquam ipsa deserunt enim, animi optio, quae facilis quo eos sed molestias. Quibusdam numquam quos sapiente nesciunt beatae. Minima, optio amet recusandae dolorum architecto temporibus possimus labore natus consequuntur odio, adipisci voluptatibus minus a nostrum quisquam aut ratione quibusdam qui maiores! Nemo repellat ea voluptatum accusantium fugiat illum amet nostrum atque. Optio aspernatur minus itaque, numquam odio iusto nesciunt velit expedita dolor, inventore autem repudiandae iste eaque facilis, ex reprehenderit deserunt reiciendis voluptate explicabo porro totam nam illo. Dicta quae error voluptatibus nihil aperiam nam, illum at repudiandae similique, suscipit iusto fugit ex voluptates velit commodi nostrum! Neque saepe, natus distinctio consequuntur quis modi doloribus temporibus culpa quos quisquam esse. Iste odio eum laborum! Iste maxime exercitationem quasi architecto tenetur nam provident fuga dolor illum possimus, ab quis nemo, consectetur assumenda sit eos impedit! Non, obcaecati dolorem.</p>
        </div>
      </main>
    </>
  );
}

export default Home;