import { GetStaticPaths, GetStaticProps } from 'next';
import CityServicePageView from '@/components/seo/CityServicePageView';
import {
  CITIES_DATA,
  SERVICES_DATA,
  ORDERED_SERVICES,
  CityData,
  ServiceData,
} from '@/lib/cityServicesData';

interface Props {
  city: CityData;
  service: ServiceData;
}

export default function AllahabadServicePage({ city, service }: Props) {
  return <CityServicePageView city={city} service={service} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ORDERED_SERVICES.map((serviceSlug) => ({
    params: { service: serviceSlug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const serviceSlug = (params?.service as string)?.toLowerCase();
  const city = CITIES_DATA['allahabad'];
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
    revalidate: 86400,
  };
};
