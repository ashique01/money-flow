import AccountsList from "@/features/accounts/components/accounts-list";

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Accounts</h1>

        <p className="text-muted-foreground">
          Manage your bank accounts, wallets and savings.
        </p>
      </div>

      <AccountsList />
    </div>
  );
}
