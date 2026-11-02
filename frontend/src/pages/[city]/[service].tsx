import { GetStaticPaths, GetStaticProps } from 'next';
import CityServicePageView from '@/components/seo/CityServicePageView';
import {
  CITIES_DATA,
  SERVICES_DATA,
  ORDERED_CITIES,
  ORDERED_SERVICES,
  CityData,
  ServiceData,
} from '@/lib/cityServicesData';

interface Props {
  city: CityData;
  service: ServiceData;
}

export default function CityServiceDynamicPage({ city, service }: Props) {
  return <CityServicePageView city={city} service={service} />;
}

// These cities have their own dedicated, custom-built page routes
// (e.g. pages/allahabad, pages/delhi, pages/gurugram) which fully replace
// this generic template for them, so they must not also be generated here.
const DEDICATED_CITY_ROUTES = ['allahabad', 'delhi', 'gurugram'];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { city: string; service: string } }[] = [];

  for (const citySlug of ORDERED_CITIES) {
    if (DEDICATED_CITY_ROUTES.includes(citySlug)) continue;
    for (const serviceSlug of ORDERED_SERVICES) {
      paths.push({
        params: {
          city: citySlug,
          service: serviceSlug,
        },
      });
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const citySlug = (params?.city as string)?.toLowerCase();
  const serviceSlug = (params?.service as string)?.toLowerCase();

  const city = CITIES_DATA[citySlug];
  const service = SERVICES_DATA[serviceSlug];

  if (!city || !service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
      service,
    },
    revalidate: 86400, // Revalidate daily
  };
};
