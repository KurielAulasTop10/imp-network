export type Authors = {
	Kuriel: AuthorInfo;
	Kazezinhu: AuthorInfo;
	Imprensa: AuthorInfo;
	Taipan: AuthorInfo;
};

type AuthorInfo = {
	name: string;
	description: string;
	imgURL: string;
	bannerURL: string;
};
