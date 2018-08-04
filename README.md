# huynhsamha

My Github page: [https://huynhsamha.github.io/](https://huynhsamha.github.io/)

## Development
Running on local with [Jekyll](https://jekyllrb.com/)

### Quickstart with new app
```bash
# Install packages by Gem
gem install bundler jekyll

# If you have some error on Ubuntu
# maybe should install package ruby-dev
# because ruby on Ubuntu is old
sudo apt-get install ruby-dev

jekyll new my-awesome-site
cd my-awesome-site

bundle exec jekyll serve
# => Now browse to http://localhost:4000
```

### Quickstart with my page
#### Installing packages via npm
```bash
npm install
# or use yarn
yarn
```

#### Installing Gem
```bash
# run directly via cli
bundle
# or run via scripts in package.json
npm run dev:install
# or use yarn
yarn run dev:install
```

#### Run on localhost:4000
```bash
# run directly
bundle exec jekyll serve
# or run via scripts in package.json
npm start
# or use yarn
yarn start
# sure have Gemfile at root
# now browse to http://localhost:4000
```
