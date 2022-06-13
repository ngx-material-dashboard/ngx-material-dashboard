import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Component Libraries',
    Svg: require('@site/static/img/gears-solid.svg').default,
    description: (
      <>
        Component Libraries designed on top of Angular Material to provide additional
        functionality, including basic CRUD capabilities, with minimal code while
        adhering to Material design principles.
      </>
    ),
  },
  {
    title: 'Service Libraries',
    Svg: require('@site/static/img/diagram-project-solid.svg').default,
    description: (
      <>
        Service Libraries designed to make interfacing with JSON APIs easy, and
        allow you to work with classes and services instead of HttpClient and
        JSON directly.
      </>
    ),
  },
  {
    title: 'Testing Libraries',
    Svg: require('@site/static/img/terminal-solid.svg').default,
    description: (
      <>
        Testing libraries designed to simplify writing tests for the Component
        libraries using Page element objects that eliminate the need for a lot
        of boilerplate set up so you can focus on the tests themselves.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
