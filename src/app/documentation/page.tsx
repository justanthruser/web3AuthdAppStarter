import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FileText, ExternalLink } from "lucide-react";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4">
      <code className="font-mono text-sm text-muted-foreground">{children.trim()}</code>
    </pre>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-primary mt-8 mb-4 pb-2 border-b border-border">{children}</h2>;
}

function SubSectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h3>;
}

export default function DocumentationPage() {
  return (
    <div className="max-w-4xl mx-auto prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center gap-2">
            <FileText className="h-8 w-8" /> Web3Auth Starter Documentation
          </CardTitle>
          <CardDescription>
            Understanding how Civic Auth enhances this dApp with seamless authentication and embedded wallets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground">
          <SectionTitle>1. Application Overview</SectionTitle>
          <p>
            The Web3Auth Starter is a demonstration application designed to showcase the integration of Civic Auth
            for Web3. It provides users with a simple, secure way to authenticate and interact with decentralized
            applications (dApps) by leveraging Civic's identity verification capabilities and embedded wallet technology.
          </p>
          <p>
            Core features include:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>Civic Pass Authentication:</strong> Users authenticate using their Civic Pass, ensuring a verified identity.</li>
            <li><strong>Embedded Wallets:</strong> Upon successful authentication, a unique, non-custodial Ethereum-compatible wallet is generated for the user directly within their browser, managed by the Civic Auth Web3 SDK.</li>
            <li><strong>Simulated Transactions:</strong> Users can initiate simulated transactions to understand the flow of using their embedded wallet.</li>
          </ul>

          <SectionTitle>2. Civic Auth Integration</SectionTitle>
          <p>
            Civic Auth is integrated to provide a user-friendly and secure authentication experience. The core of this integration revolves around the (mocked for this demo) <code>@civic/auth-web3</code> SDK.
          </p>

          <SubSectionTitle>2.1. Authentication Flow</SubSectionTitle>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li><strong>Connection Initiation:</strong> The user clicks the "Connect with Civic" button, typically found in the application header (<code>CivicAuthButton</code> component).</li>
            <li><strong>SDK Interaction:</strong> This action triggers the <code>login</code> function within our <code>AuthContext</code>. The context then calls a (mocked) <code>civicService.login()</code> method.
            <CodeBlock>
{`// In AuthProvider.tsx
const login = async () => {
  // ...
  const { user, walletAddress } = await civicService.login(); // Calls the mock service
  // Update state with user and walletAddress
  // ...
};`}
            </CodeBlock>
            In a real application, <code>civicService.login()</code> would use the actual <code>@civic/auth-web3</code> SDK to:
              <ul className="list-disc list-inside space-y-1 pl-6 mt-2">
                <li>Prompt the user to authenticate with their Civic Pass.</li>
                <li>Verify the user's identity.</li>
                <li>Securely generate or retrieve the user's embedded wallet keys.</li>
              </ul>
            </li>
            <li><strong>State Management:</strong> Upon successful authentication and wallet generation, the <code>AuthContext</code> updates its state, making the user's information and wallet address available throughout the application.</li>
          </ol>

          <SubSectionTitle>2.2. Embedded Wallet Generation</SubSectionTitle>
          <p>
            A key feature of the Civic Auth integration is the automatic generation of an embedded, non-custodial wallet for each authenticated user. This means:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>User-Friendly:</strong> Users don't need to manage complex seed phrases or install separate wallet browser extensions to get started.</li>
            <li><strong>Non-Custodial:</strong> The user retains full control over their keys and assets. The Civic SDK facilitates key management securely within the user's device context.</li>
            <li><strong>Seamless Experience:</strong> The wallet is available immediately after authentication, allowing for instant interaction with dApp features.</li>
          </ul>
          <p>
            The (mocked) <code>civicService.login()</code> function simulates this by returning a randomly generated wallet address.
          </p>

          <SectionTitle>3. Transaction Flow (Simulated)</SectionTitle>
          <p>
            Once authenticated, users can send simulated transactions using their embedded wallet via the <code>TransactionForm</code> component.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li><strong>Input Details:</strong> The user provides a recipient address and an amount in the form.</li>
            <li><strong>Initiate Sending:</strong> Clicking "Send Simulated Transaction" calls the <code>sendTransaction</code> method from the <code>AuthContext</code>.</li>
            <li><strong>SDK Usage (Simulated):</strong> The context, using the authenticated user's <code>walletAddress</code>, calls the (mocked) <code>civicService.sendTransaction(from, to, amount)</code>.
            <CodeBlock>
{`// In AuthProvider.tsx
const sendTransaction = async (to, amount) => {
  // ...
  const success = await civicService.sendTransaction(walletAddress, to, amount);
  // Handle success/failure with toast notifications
  // ...
};`}
            </CodeBlock>
            In a real scenario, the <code>@civic/auth-web3</code> SDK would handle:
              <ul className="list-disc list-inside space-y-1 pl-6 mt-2">
                <li>Constructing the transaction.</li>
                <li>Prompting the user for confirmation (if necessary, depending on SDK configuration).</li>
                <li>Signing the transaction using the embedded wallet's private key.</li>
                <li>Broadcasting the signed transaction to the relevant blockchain network.</li>
              </ul>
            </li>
            <li><strong>Feedback:</strong> The user receives a toast notification indicating the simulated success or failure of the transaction.</li>
          </ol>

          <SectionTitle>4. Key Components</SectionTitle>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><code>src/components/auth/CivicAuthButton.tsx</code>: Handles the UI for connecting and disconnecting the Civic wallet.</li>
            <li><code>src/components/dashboard/TransactionForm.tsx</code>: Provides the interface for initiating simulated transactions.</li>
            <li><code>src/providers/auth-provider.tsx</code> & <code>src/contexts/auth-context.ts</code>: Manages global authentication state, user details, and wallet information.</li>
            <li><code>src/lib/civic.ts</code>: Contains the <strong>mocked</strong> implementation of the Civic SDK service. In a production app, this would be replaced with actual calls to <code>@civic/auth-web3</code>.</li>
          </ul>

          <SectionTitle>5. Important Note on Mocking</SectionTitle>
          <Card className="border-destructive bg-destructive/10 my-4">
            <CardContent className="pt-6">
            <p className="font-semibold text-destructive-foreground">
              <Code size={18} className="inline mr-1" /> For demonstration purposes, the interactions with the <code>@civic/auth-web3</code> SDK are <strong>mocked</strong> in <code>src/lib/civic.ts</code>.
            </p>
            <p className="text-destructive-foreground/80 mt-2">
              This means that no actual Civic authentication or blockchain transactions occur. The mock service simulates the expected behavior of the SDK to illustrate the application's intended architecture and user flow. A full integration would require installing the <code>@civic/auth-web3</code> package, configuring it with appropriate API keys or service endpoints, and potentially handling more complex asynchronous flows and error states provided by the SDK.
            </p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
             <a 
              href="https://docs.civic.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent-foreground bg-accent hover:bg-accent/90"
            >
              Visit Official Civic Docs <ExternalLink size={18} className="ml-2" />
            </a>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
