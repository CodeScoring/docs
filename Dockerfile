FROM squidfunk/mkdocs-material

ENTRYPOINT ["/sbin/tini", "--", "mkdocs"]
CMD ["serve", "--dev-addr=0.0.0.0:8000", "--livereload"]

RUN pip3 install mkdocs-print-site-plugin mkdocs-i18n mkdocs-llmstxt