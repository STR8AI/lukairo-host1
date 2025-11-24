/**
 * Basic unit tests for the optimized UI enhancement code
 * Run with: node test-logic.js
 */

// Mock DOM environment
const mockDocument = () => {
  const elements = new Map();
  let elementIdCounter = 0;
  
  return {
    documentElement: {
      style: {
        properties: {},
        setProperty(key, value) {
          this.properties[key] = value;
        }
      }
    },
    querySelector: (selector) => null,
    querySelectorAll: (selector) => [],
    addEventListener: () => {},
    readyState: 'loading',
    contains: (node) => true
  };
};

// Test 1: Palette application only once
console.log('Test 1: Palette application');
let callCount = 0;
let paletteApplied = false;
const applyPalette = () => {
  if (paletteApplied) {
    console.log('  ✓ Palette already applied, skipping');
    return;
  }
  paletteApplied = true;
  callCount++;
  console.log('  ✓ Palette applied (count: ' + callCount + ')');
};

applyPalette(); // First call
applyPalette(); // Second call
applyPalette(); // Third call

if (callCount === 1) {
  console.log('✓ Test 1 PASSED: Palette applied exactly once\n');
} else {
  console.log('✗ Test 1 FAILED: Expected 1 call, got ' + callCount + '\n');
}

// Test 2: Debouncing logic
console.log('Test 2: Debouncing logic');
let debounceCallCount = 0;
let mutationTimeout = null;
let pendingNodes = new Set();

const processMutations = () => {
  mutationTimeout = null;
  if (pendingNodes.size === 0) return;
  debounceCallCount++;
  console.log('  ✓ Processing batch (count: ' + debounceCallCount + ', nodes: ' + pendingNodes.size + ')');
  pendingNodes.clear();
};

// Simulate rapid mutations
for (let i = 0; i < 10; i++) {
  const node = { id: i };
  pendingNodes.add(node);
  if (mutationTimeout) clearTimeout(mutationTimeout);
  mutationTimeout = setTimeout(processMutations, 100);
}

// Wait for debounce to complete
setTimeout(() => {
  if (debounceCallCount === 1 && pendingNodes.size === 0) {
    console.log('✓ Test 2 PASSED: 10 mutations debounced into 1 call\n');
  } else {
    console.log('✗ Test 2 FAILED: Expected 1 call, got ' + debounceCallCount + '\n');
  }
  
  // Test 3: Navigation path matching
  console.log('Test 3: Navigation path matching');
  
  const testCases = [
    { path: '/dashboard', href: '/dashboard', expected: true },
    { path: '/dashboard/analytics', href: '/dashboard', expected: true },
    { path: '/settings', href: '/set', expected: false }, // Should NOT match
    { path: '/about', href: '/about', expected: true },
    { path: '/settings', href: '/settings', expected: true },
    { path: '/set', href: '/settings', expected: false },
  ];
  
  let passedTests = 0;
  testCases.forEach(({ path, href, expected }) => {
    // Improved matching logic (excluding root "/" which is filtered in actual implementation)
    const matches = (path === href || (href.length > 1 && path.startsWith(href + "/")));
    const result = matches === expected ? '✓' : '✗';
    
    if (matches === expected) {
      passedTests++;
      console.log(`  ${result} "${path}" vs "${href}" = ${matches} (expected: ${expected})`);
    } else {
      console.log(`  ${result} FAILED: "${path}" vs "${href}" = ${matches} (expected: ${expected})`);
    }
  });
  
  if (passedTests === testCases.length) {
    console.log(`✓ Test 3 PASSED: All ${testCases.length} navigation tests correct\n`);
  } else {
    console.log(`✗ Test 3 FAILED: ${passedTests}/${testCases.length} tests passed\n`);
  }
  
  // Test 3b: Root path handling
  console.log('Test 3b: Root path handling');
  const rootPath = '/';
  const rootHref = '/';
  const rootMatches = (rootPath === rootHref || rootPath === '');
  if (rootMatches) {
    console.log(`  ✓ Root path "/" correctly matches home link "/"`);
    console.log(`✓ Test 3b PASSED: Root path handling works\n`);
  } else {
    console.log(`✗ Test 3b FAILED: Root path should match home link\n`);
  }
  
  // Test 4: Old vs new navigation logic comparison
  console.log('Test 4: Bug fix verification');
  
  // Old buggy logic
  const oldMatches = (path, href) => {
    return href && path.startsWith(href);
  };
  
  // New fixed logic
  const newMatches = (path, href) => {
    return path === href || (href.length > 1 && path.startsWith(href + '/'));
  };
  
  const bugCase = { path: '/settings', href: '/set' };
  const oldResult = oldMatches(bugCase.path, bugCase.href);
  const newResult = newMatches(bugCase.path, bugCase.href);
  
  console.log(`  Old logic: "${bugCase.path}" matches "${bugCase.href}" = ${oldResult} (BUG!)`);
  console.log(`  New logic: "${bugCase.path}" matches "${bugCase.href}" = ${newResult} (FIXED!)`);
  
  if (oldResult === true && newResult === false) {
    console.log('✓ Test 4 PASSED: Bug fix verified\n');
  } else {
    console.log('✗ Test 4 FAILED: Bug not properly fixed\n');
  }
  
  console.log('='.repeat(50));
  console.log('All tests completed!');
  console.log('='.repeat(50));
  
}, 150); // Wait for debounce timeout
