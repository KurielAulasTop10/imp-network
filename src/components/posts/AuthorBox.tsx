import { Post } from '@/types/post';

export default function AuthorBox({
    post: { author },
}: {
    post: Post;
}) {

    type AuthorInfo = {
        name: string;
        description: string;
        imgURL: string;
    };

    type Authors = {
        Kuriel: AuthorInfo;
        Kazezinhu: AuthorInfo;
        Império: AuthorInfo;
    };


    const authors = {
        Kuriel: {
            name: 'Kuriel',
            description: 'Olá! Meu nome é Kuriel e sou responsável pelo conteúdo que você acabou de ler.',
            imgURL: 'https://i.imgur.com/tjpcf6Q.jpeg',
        },
        Kazezinhu: {
            name: 'Kazezinhu',
            description: 'Um amante de jogos, animes e tecnologia. Seja bem vindo e espero que tenha gostado!',
            imgURL: 'https://i.imgur.com/p4tkDIo.png',
        },
        Império: {
            name: 'Imprensa Império Network',
            description: 'Somos Império! Somos simples!',
            imgURL: 'https://i.imgur.com/2r6fdnK.jpeg',
        },
    };

    const authorInfo = authors[author as keyof Authors];

    return (
        <div className="border-gray-700 border-2 p-3 flex w-full items-center justify-start gap-5 mt-10 px-10">
            <img src={authorInfo.imgURL} alt={authorInfo.name} width={100} height={100} className='rounded-full' />
            <div className='flex flex-col'>
                <h3 className='text-xl text-white font-bold'>{authorInfo.name}</h3>
                <p className='text-white text-md'>{authorInfo.description}</p>
            </div>
        </div>
    );
}