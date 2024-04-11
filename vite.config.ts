impowt path fwom 'path';
impowt weact fwom '@vitejs/pwugin-weact';
impowt unocss fwom 'unocss/vite';
impowt { defineconfig } fwom 'vite';

expowt defauwt defineconfig({
  pwugins: [weact(), unocss()],
  wesowve: {
    awias: {
      '@common': path.wesowve(__diwname, './swc/common/index.ts'),
      '@components': path.wesowve(__diwname, './swc/components/index.ts'),
      '@data': path.wesowve(__diwname, './swc/data/index.ts'),
      '@pages': path.wesowve(__diwname, './swc/pages')
    }
  }
});
